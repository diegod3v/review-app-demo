import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import AdminLayout from "../../components/AdminLayout";
import ResourceForm from "../../components/ResourceForm";
import DataTable from "../../components/DataTable";
import API from "../../shared/api";
import Modal from "react-modal";
import classnames from "classnames";

const resourceFields = {
  restaurants: ["name", "description", "phone", "website", "thumbnail"],
  reviews: ["date", "comment", "rate", "restuarantId"],
  users: ["name", "email", "password"],
};

const resourceHeadings = {
  restaurants: [
    { name: "ID", key: "id" },
    { name: "name", key: "name" },
    { name: "description", key: "description" },
    { name: "phone", key: "phone" },
    { name: "website", key: "website" },
    { name: "thumbnail", key: "thumbnail" },
  ],
  reviews: [
    { name: "ID", key: "id" },
    { name: "date", key: "date" },
    { name: "comment", key: "comment" },
    { name: "rate", key: "rate" },
  ],
  users: [
    { name: "ID", key: "id" },
    { name: "name", key: "name" },
    { name: "email", key: "email" },
  ],
};

const customStyles = {
  overlay: {
    backgroundColor: "rgba(100, 100, 100, 0.75)",
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    border: "none",
    borderRadius: "2rem",
    transform: "translate(70%, 20%)",
  },
};

function AdminDataTypePage({ data }) {
  const Router = useRouter();
  const [dataSelected, setDataSelected] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [createModalOpen, setCreateModalOpen] = useState(false);

  const { datatype } = Router.query;
  const fields = resourceFields[datatype as string];
  const headings = resourceHeadings[datatype as string];

  return (
    <AdminLayout>
      <DataTable
        headings={headings}
        data={data}
        selected={dataSelected}
        onSelect={(data) => {
          setDataSelected(data);
          setEditModalOpen(true);
        }}
      />
      <div className="flex justify-end w-11/12">
        <button
          className="bg-yellow-500 py-1 px-3 rounded-full font-semibold uppercase text-white"
          onClick={() => setCreateModalOpen(true)}
        >
          Create New
        </button>
      </div>
      <Modal
        className="p-12 bg-white w-5/12"
        isOpen={createModalOpen}
        onRequestClose={() => setCreateModalOpen(false)}
        contentLabel="Create"
        style={customStyles}
      >
        <div className="my-5 w-8/12 mx-auto">
          <h1 className="text-2xl font-semibold text-center mb-10">
            Create New Entry
          </h1>
          <ResourceForm
            fields={fields}
            onSubmit={async (values) => {
              if (datatype === "restaurants") {
                await API.createRestaurant(values);
              } else if (datatype === "reviews") {
                const { restaurantId, ...review } = values;
                await API.createReview(restaurantId, review);
              } else if (datatype === "users") {
                await API.createUser(values);
              }

              setCreateModalOpen(false);
              Router.replace(Router.asPath);
            }}
          />
        </div>
      </Modal>
      <Modal
        className="p-12 bg-white w-5/12"
        isOpen={editModalOpen}
        onRequestClose={() => setEditModalOpen(false)}
        contentLabel="Create"
        style={customStyles}
      >
        <div className="my-5 w-8/12 mx-auto">
          <h1 className="text-2xl font-semibold text-center mb-10">
            Edit Entry
          </h1>
          <ResourceForm
            key={dataSelected?.id}
            initialValues={dataSelected}
            fields={fields}
            onSubmit={async (values) => {
              if (datatype === "restaurants") {
                await API.updateRestaurant(values, dataSelected.id);
              } else if (datatype === "reviews") {
                const { restaurantId, ...review } = values;
                await API.updateReview(review, dataSelected.id);
              } else if (datatype === "users") {
                await API.updateUser(values, dataSelected.id);
              }

              setEditModalOpen(false);

              Router.replace(Router.asPath);
            }}
          />
          <button
            className={classnames(
              "bg-transparent border-2 border-red-500 text-red-500 rounded-full px-6 py-2 w-full uppercase font-bold text-sm mt-7"
            )}
            onClick={async (values) => {
              try {
                if (datatype === "restaurants") {
                  await API.removeRestaurant(dataSelected.id);
                } else if (datatype === "reviews") {
                  await API.removeReview(dataSelected.id);
                } else if (datatype === "users") {
                  await API.removeUser(dataSelected.id);
                }
              } catch (err) {
                console.log(err);
              }

              setEditModalOpen(false);

              Router.replace(Router.asPath);
            }}
          >
            Delete
          </button>
        </div>
      </Modal>
    </AdminLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async ({
  params,
  req,
}) => {
  const { datatype } = params;
  let data = null;

  if (datatype === "restaurants") {
    const { restaurants } = await API.getAllRestaurantsAdmin();
    data = restaurants;
  } else if (datatype === "reviews") {
    const { reviews } = await API.getAllReviewsAdmin();
    data = reviews;
  } else if (datatype === "users") {
    const { users } = await API.getAllUsersAdmin();
    data = users;
  }

  return {
    props: { data },
  };
};

export default AdminDataTypePage;

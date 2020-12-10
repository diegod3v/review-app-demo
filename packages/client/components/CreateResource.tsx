import { Formik } from "formik";
import classnames from "classnames";

type Props = {
  fields: string[];
  onSubmit: (values) => void;
};

function CreateResource({ fields, onSubmit }: Props) {
  const initialValues = {};
  fields.forEach((field) => (initialValues[field] = ""));

  return (
    <section>
      <div>
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
          {({
            values,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => (
            <form onSubmit={handleSubmit}>
              {fields.map((field) => (
                <div key={field} className="mb-4">
                  <label className="text-xs block mb-2">{field}</label>
                  <input
                    className="rounded-md bg-gray-200 p-1 w-full"
                    name={field}
                    value={values[field]}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                </div>
              ))}
              <div>
                <button
                  type="submit"
                  className={classnames(
                    "bg-yellow-500 rounded-full px-6 py-2 text-white w-full uppercase font-bold text-sm",
                    { "bg-yellow-100": isSubmitting }
                  )}
                  disabled={isSubmitting}
                >
                  Send
                </button>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </section>
  );
}

export default CreateResource;

import { Formik } from "formik";
import Rate from "./Rate";
import classnames from "classnames";
import moment from "moment";

interface Review {
  date: string;
  comment: string;
  rate: number;
}

type Props = {
  onSubmit: (review: Review) => void;
};

function CommentComposer({ onSubmit }: Props) {
  return (
    <div>
      <p className="mb-2">Leave Your Review</p>
      <Formik
        initialValues={{
          date: moment(new Date()).format("YYYY-MM-DD"),
          comment: "",
          rate: 0,
        }}
        onSubmit={(values) => {
          onSubmit({
            ...values,
            date: moment(values.date, "YYYY-MM-DD").toISOString(true),
          });
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          setFieldValue,
        }) => (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="text-xs block mb-2">Visit date:</label>
              <input
                className="rounded-md bg-gray-200 p-1"
                type="date"
                name="date"
                value={values.date}
                pattern="[0-9]{2}\/[0-9]{2}\/[0-9]{4}"
                onBlur={handleBlur}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label className="text-xs block mb-2">Comment:</label>
              <textarea
                className="bg-gray-200 w-full h-24 shadow rounded-md p-2"
                placeholder="Nice restaurant!!"
                name="comment"
                value={values.comment}
                onBlur={handleBlur}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label className="text-xs block mb-2">Rate:</label>
              <Rate
                rate={values.rate}
                onChange={(value) => setFieldValue("rate", value)}
                editable
              />
            </div>
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
  );
}

export default CommentComposer;

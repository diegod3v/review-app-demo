import { Formik } from "formik";
import classnames from "classnames";
import { pick } from "lodash";

type Props = {
  fields: string[];
  onSubmit: (values) => void;
  initialValues?: any;
};

function ResourceForm({ fields, onSubmit, initialValues }: Props) {
  let initialFormValues = {};
  if (initialValues) {
    initialFormValues = pick(initialValues, fields);
  } else {
    fields.forEach((field) => (initialFormValues[field] = ""));
  }

  return (
    <section>
      <div>
        <Formik
          initialValues={initialFormValues}
          onSubmit={async (values, formikBag) => {
            try {
              await onSubmit(values);
            } catch (err) {
              formikBag.setStatus({ generalError: err.message });
            }
          }}
        >
          {({
            values,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            status,
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
                {status?.generalError && (
                  <div>
                    <p className="text-xs text-red-500">
                      There was an error: {status.generalError}
                    </p>
                  </div>
                )}
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

export default ResourceForm;

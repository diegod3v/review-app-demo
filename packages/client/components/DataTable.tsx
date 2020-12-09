type Props = {
  headings: { name: string; key: string };
  data: any[];
};

function DataTable({ headings, data }) {
  return (
    <div className="container mx-auto py-6 px-4">
      <div className="mb-4 flex justify-between items-center">
        <div className="flex-1 pr-4">
          <div className="relative md:w-1/3">
            <input
              type="search"
              className="w-full pl-10 pr-4 py-2 rounded-lg shadow focus:outline-none focus:shadow-outline text-gray-600 font-medium"
              placeholder="Search..."
            />
            <div className="absolute top-0 left-0 inline-flex items-center p-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 text-gray-400"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="0" y="0" width="24" height="24" stroke="none"></rect>
                <circle cx="10" cy="10" r="7" />
                <line x1="21" y1="21" x2="15" y2="15" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow overflow-y-auto relative">
        <table className="border-collapse table-auto w-full whitespace-no-wrap bg-white table-striped relative">
          <thead>
            <tr className="text-left">
              <th className="py-2 px-3 sticky top-0 border-b border-gray-200 bg-yellow-100">
                <label className="text-teal-500 inline-flex justify-between items-center hover:bg-gray-200 px-2 py-2 rounded-lg cursor-pointer">
                  <input
                    type="checkbox"
                    className="form-checkbox focus:outline-none focus:shadow-outline"
                  />
                </label>
              </th>
              {headings.map((heading) => (
                <th className=" bg-yellow-100 sticky top-0 border-b border-gray-200 px-6 py-2 text-gray-600 font-bold tracking-wider uppercase text-xs">
                  {heading.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((user) => (
              <tr className="hover:bg-gray-100">
                <td className="border-dashed border-t border-gray-200 px-3">
                  <label className="text-teal-500 inline-flex justify-between items-center hover:bg-gray-200 px-2 py-2 rounded-lg cursor-pointer">
                    <input
                      type="checkbox"
                      className="form-checkbox rowCheckbox focus:outline-none focus:shadow-outline"
                    />
                  </label>
                </td>
                {headings.map((heading) => (
                  <td className="border-dashed border-t border-gray-200 userId">
                    <span className="text-gray-700 px-6 py-3 flex items-center">
                      {user[heading.key]}
                    </span>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="my-9">
        <div className="flex space-x-1">
          <button className="bg-yellow-100 py-1 px-3">{"<"}</button>
          {[1, 2, 3].map((n) => (
            <div className="bg-gray-300 py-1 px-3">{n}</div>
          ))}
          <button className="bg-yellow-100 py-1 px-3">{">"}</button>
        </div>
      </div>
    </div>
  );
}

export default DataTable;

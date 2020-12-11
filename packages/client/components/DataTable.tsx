import classnames from "classnames";

type Props = {
  headings: [{ name: string; key: string }];
  data: any[];
  selected: any;
  onSelect: (data: any, index: number) => void;
};

function DataTable({ headings, data, selected, onSelect }: Props) {
  return (
    <div className="container mx-auto py-6 px-4">
      <div className="overflow-x-auto bg-white rounded-lg shadow overflow-y-auto relative">
        <table className="border-collapse table-auto w-full whitespace-no-wrap bg-white table-striped relative">
          <thead>
            <tr className="text-left">
              {headings.map((heading) => (
                <th
                  key={heading.key}
                  className=" bg-yellow-100 sticky top-0 border-b border-gray-200 px-6 py-2 text-gray-600 font-bold tracking-wider uppercase text-xs"
                >
                  {heading.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((dataRow, i) => (
              <tr
                key={dataRow.id}
                className={classnames("hover:bg-gray-100", {
                  "bg-gray-300": selected?.id === dataRow?.id,
                })}
                onClick={() => onSelect(dataRow, i)}
              >
                {headings.map((heading) => (
                  <td
                    key={heading.key}
                    className="border-dashed border-t border-gray-200"
                  >
                    <span className="text-gray-700 px-6 py-3 flex items-center">
                      {dataRow[heading.key]}
                    </span>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DataTable;

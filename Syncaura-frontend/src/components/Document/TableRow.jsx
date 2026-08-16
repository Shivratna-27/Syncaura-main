import { FileText, Trash2 } from "lucide-react";

const TableRow = ({ name, type, version, date, status, docColor, onEdit, onDelete }) => {
  function formatDateYYYYMMDD(isoDate) {
    if (!isoDate) return new Date().toISOString().split("T")[0];
    try {
      const d = new Date(isoDate);
      if (isNaN(d.getTime())) return new Date().toISOString().split("T")[0];
      return d.toISOString().split("T")[0];
    } catch {
      return new Date().toISOString().split("T")[0];
    }
  }

  const statusColor = {
    Final: "bg-[#DCFCE7] text-[#29CC39]",
    Draft: "bg-[#FEF9C3] text-[#954D4E]",
    Revised: "bg-[#DBEAFE] text-[#3053B4]",
    Active: "bg-[#DCFCE7] text-[#29CC39]",
  };

  return (
    <>
      <div className="hidden md:flex items-center justify-center w-full px-10">
        <div className="flex items-center gap-5 w-full flex-4/13">
          <FileText className={`size-8 ${docColor}`} />
          <h1 className="text-base font-medium text-black dark:text-[#FFFFFF] truncate">{name}</h1>
        </div>

        <div className="flex-2/13 w-full">
          <h1 className="uppercase text-base text-black font-medium dark:text-[#FFFFFF]">{type}</h1>
        </div>

        <div className="flex-2/13 w-full">
          <h1 className="text-base font-medium text-black dark:text-white">{version}</h1>
        </div>

        <div className="flex-2/13 w-full">
          <h1 className="text-base font-medium text-black dark:text-white">
            {formatDateYYYYMMDD(date)}
          </h1>
        </div>

        <div className="flex-2/13 w-full flex items-center justify-center">
          <div
            className={`w-25 flex items-center justify-center py-1.5 rounded-md text-sm font-medium ${statusColor[status] || statusColor.Active}`}
          >
            {status}
          </div>
        </div>

        <div className="flex-1/13 w-full flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onEdit && onEdit();
            }}
            className="text-[#2461E6] dark:text-[#73FBFD] hover:underline font-medium btn-hover"
          >
            Edit
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onDelete && onDelete();
            }}
            title="Delete document"
            className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg transition btn-hover"
          >
            <Trash2 className="size-5 text-red-500" />
          </button>
        </div>
      </div>

      <div className="md:hidden w-full px-4">
        <div className="flex flex-col gap-3 rounded-xl border bg-white dark:bg-black p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <FileText className={`size-7 ${docColor}`} />
            <h1 className="font-semibold text-black dark:text-white text-sm break-all">
              {name}
            </h1>
          </div>

          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <p className="text-gray-500">Type</p>
              <p className="font-medium uppercase text-black dark:text-white">{type}</p>
            </div>

            <div>
              <p className="text-gray-500">Version</p>
              <p className="font-medium text-black dark:text-white">{version}</p>
            </div>

            <div>
              <p className="text-gray-500">Last Modified</p>
              <p className="font-medium text-black dark:text-white">
                {formatDateYYYYMMDD(date)}
              </p>
            </div>

            <div>
              <p className="text-gray-500">Status</p>
              <span
                className={`inline-block px-5 py-1 mt-2 rounded-md text-xs font-medium ${statusColor[status] || statusColor.Active}`}
              >
                {status}
              </span>
            </div>
          </div>

          <div className="flex justify-end items-center gap-3 pt-2">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onEdit && onEdit();
              }}
              className="text-sm font-medium text-[#2461E6] dark:text-[#73FBFD] hover:underline btn-hover"
            >
              Edit
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onDelete && onDelete();
              }}
              title="Delete document"
              className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg transition btn-hover"
            >
              <Trash2 className="size-5 text-red-500" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default TableRow;

import { motion } from "framer-motion";
import FilterDropdown from "../common/FilterDropdown";
import { useState } from "react";
import { X, RotateCcw, Filter, Check } from "lucide-react";

export default function DocumentFilter({ onClose, onApply }) {
  const [status, setStatus] = useState("ALL");
  const [type, setType] = useState("ALL");
  const [version, setVersion] = useState("Above");
  const [versionNo, setVersionNo] = useState("ALL");
  const [date, setDate] = useState("");

  const statusOptions = ["ALL", "Active", "Final", "Draft", "Revised"];

  const handleReset = () => {
    setStatus("ALL");
    setType("ALL");
    setVersion("Above");
    setVersionNo("ALL");
    setDate("");
    onApply(null);
    onClose();
  };

  const handleApply = () => {
    onApply({
      status,
      type,
      version,
      versionNo,
      date,
    });
    onClose();
  };

  return (
    <div className="w-full px-2 sm:px-6 lg:px-7">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="w-full bg-white dark:bg-[#1A1A1A] rounded-2xl border border-gray-200 dark:border-gray-800 shadow-2xl p-5 sm:p-6 flex flex-col gap-6 relative"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-3">
          <div className="flex items-center gap-2">
            <Filter className="size-5 text-blue-600 dark:text-[#73FBFD]" />
            <h3 className="text-base font-bold text-gray-900 dark:text-white">
              Filter Documents & Reports
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-700 dark:hover:text-white p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition btn-hover"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Form Controls Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Date Range */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-300">
              Date Range
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full rounded-xl border border-gray-300 dark:border-[#333333] px-3.5 py-2.5 text-sm bg-white dark:bg-[#242424] text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            />
          </div>

          {/* Type */}
          <FilterDropdown
            options={["ALL", "PDF", "XLS", "DOC", "ZIP", "Document", "Report"]}
            startVal={type}
            label="Type"
            onChange={setType}
          />

          {/* Version */}
          <FilterDropdown
            options={["Above", "Below"]}
            startVal={version}
            label="Version"
            onChange={setVersion}
          />

          {/* Version No */}
          <FilterDropdown
            options={[
              "ALL",
              "v1.0",
              "v1.5",
              "v2.0",
              "v2.5",
              "v3.0",
              "v3.5",
              "v4.0",
              "v5.0",
            ]}
            startVal={versionNo}
            label="Version No"
            onChange={setVersionNo}
          />
        </div>

        {/* Footer: Status + Buttons */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 border-t border-gray-100 dark:border-gray-800 pt-4">
          {/* Status Options */}
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-300">
              Status:
            </span>
            <div className="flex flex-wrap gap-2">
              {statusOptions.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setStatus(item)}
                  className={`btn-hover px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                    status === item
                      ? "border-blue-600 bg-blue-50 text-blue-600 dark:border-[#73FBFD] dark:text-[#73FBFD] dark:bg-[#73FBFD]/10"
                      : "border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 justify-end shrink-0">
            <button
              type="button"
              onClick={handleReset}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-700 text-sm font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition btn-hover"
            >
              <RotateCcw className="size-4" />
              Reset
            </button>

            <button
              type="button"
              onClick={handleApply}
              className="flex items-center gap-2 bg-blue-600 dark:bg-[#73FBFD] dark:text-black text-white font-semibold px-5 py-2 rounded-xl shadow-md text-sm hover:bg-blue-700 dark:hover:bg-[#3ce5e8] transition btn-hover cursor-pointer"
            >
              <Check className="size-4" />
              Apply Filters
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

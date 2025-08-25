import React from "react";
import { PAGE_SIZE } from "../db";

export default function Pagination({ page, setPage, totalCount }) {
  return (
    <div style={{marginBottom:'50px', marginTop:'50px'}} className="pagination-container">
      <button
        onClick={() => setPage((prev) => Math.max(1, prev - 1))}
        disabled={page === 1}
      >
        ⬅ Prev
      </button>
      <span>Page {page}</span>
      <button
        onClick={() => setPage((prev) => prev + 1)}
        disabled={page * PAGE_SIZE >= totalCount}
      >
        Next ➡
      </button>
    </div>
  );
}

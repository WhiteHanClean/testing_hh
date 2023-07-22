import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import s from "./MyTable.module.scss";
import { useFetchAllPostsQuery } from "../../../service/PostService";
import { DownOutlined } from "@ant-design/icons";

const MyTable = ({ searchQuery }) => {
  const navigate = useNavigate();

  const [table, setTable] = useState({
    columns: [
      {
        title: (
          <div className={s.table_header}>
            <span>ID</span> <DownOutlined />
          </div>
        ),
        dataIndex: "id",
        key: "id",
        sorter: (a, b) => a.id - b.id,
        icon: <DownOutlined />,
        className: s.no_sort_style,
      },
      {
        title: (
          <div className={s.table_header}>
            <span>Заголовок</span> <DownOutlined />
          </div>
        ),
        dataIndex: "title",
        key: "title",
        sorter: (a, b) => a.title.localeCompare(b.title),
        icon: <DownOutlined />,
        className: s.no_sort_style,
      },
      {
        title: (
          <div className={s.table_header}>
            <span>Описание</span> <DownOutlined />
          </div>
        ),
        dataIndex: "body",
        key: "body",
        sorter: (a, b) => a.title.localeCompare(b.title),
        icon: <DownOutlined />,
        className: s.no_sort_style,
      },
    ],
    data: null,
  });
  const [currentPage, setCurrentPage] = useState(1);

  const { data, error, isLoading } = useFetchAllPostsQuery(currentPage);

  useEffect(() => {
    navigate(`${currentPage}`);
  }, [currentPage]);

  const filteredData = data
    ? data.filter((item) => {
        return Object.values(item).some((value) => {
          if (typeof value === "string") {
            return value.toLowerCase().includes(searchQuery.toLowerCase());
          }
          return false;
        });
      })
    : []; // funtion для фильтрации таблицы

  console.log(data);

  const totalPages = Math.ceil(filteredData.length / 1);

  const pageNumbers = [];
  for (let i = 0; i <= totalPages; i++) {
    if (i >= currentPage && i <= currentPage + 4) {
      pageNumbers.push(i);
    }
  }

  return (
    <>
      {isLoading && <div>Loading...</div>}
      {error && <div>Error: {error.message}</div>}
      {data && (
        <Table
          columns={table.columns}
          dataSource={filteredData.map((item) => ({ ...item, key: item.id }))}
          pagination={false}
          className={s.my_table}
        />
      )}

      <div className={s.pag_block}>
        {currentPage !== 1 ? (
          <button onClick={() => setCurrentPage(currentPage - 1)}>
            {" "}
            Назад{" "}
          </button>
        ) : (
          <button disabled> Назад </button>
        )}

        <div>
          {pageNumbers.map((pageNumber) => (
            <button
              key={pageNumber}
              onClick={() => {
                navigate(`/${pageNumber}`);
                setCurrentPage(pageNumber);
              }}
              className={pageNumber == currentPage ? s.active : ""}
            >
              {pageNumber}
            </button>
          ))}
        </div>

        <button onClick={() => setCurrentPage(currentPage + 1)}> Далее </button>
      </div>
    </>
  );
};

export default MyTable;

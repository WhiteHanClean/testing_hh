import React, { useState } from "react";
import s from "./MyInput.module.scss";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useSearchPostsQuery } from "../../../service/PostService";


const MyInput = ({setSearchQuery}) => {

  return (
    <Input
      placeholder="Поиск"
      className={s.my_input}
      onChange={(e) => setSearchQuery(e.target.value)}
      suffix={<SearchOutlined style={{ fontSize: '21px'}}/>}
    />
  );
};

export default MyInput;

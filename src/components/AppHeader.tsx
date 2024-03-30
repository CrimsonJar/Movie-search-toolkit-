import React, { useEffect, useState } from "react";
import { Layout, Menu, Input, Tooltip, Button } from "antd";
import type { SearchProps } from "antd/es/input/Search";
import { MenuInfo } from "rc-menu/lib/interface";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { CrownOutlined } from "@ant-design/icons";
import { fetchMovie } from "../reducers/movieSlice";
import { RootState } from "../store";
import { toggleShowFavorites } from "../reducers/favoriteMoviesSlice";
import type { AppLayoutProps } from "../types/types";
import { AppDispatch } from "../store";

const { Header } = Layout;
const { Search } = Input;

const AppHeader: React.FC<AppLayoutProps> = ({ onSearch }) => {
  const items = [
    { key: 1, label: `Поиск по названию` },
    { key: 2, label: `Поиск по IMDb Id` },
  ];

  const dispatch = useDispatch<AppDispatch>();
  const [findedItem, setfindedItem] = useState([1]);
  const handleSearch = (value: string) => {
    const searchType = findedItem[0] === 1 ? "title" : "id";

    dispatch(fetchMovie({ searchValue: value, searchType }));
  };
  const choseMenuItem = (info: MenuInfo) => {
    console.log("item", info.item);
    console.log("key", info.key);
  };
  const handleShowFavorites = () => {
    dispatch(toggleShowFavorites());
  };
  const showFavorites = useSelector(
    (state: RootState) => state.favoriteMovies.showFavorites
  );
  const buttonText = showFavorites ? "Найденные фильмы" : "Избранное";
  console.log({ showFavorites, buttonText });
  return (
    <Header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 1,
        width: "100%",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Tooltip title={`Перейти в ${buttonText}`}>
        <Button
          type='primary'
          icon={<CrownOutlined />}
          onClick={handleShowFavorites}
        >
          {buttonText}
        </Button>
      </Tooltip>
      <div className='demo-logo' />
      <Search
        placeholder='введите текст для поиска'
        onSearch={handleSearch}
        style={{ width: 300 }}
      />

      <Menu
        theme='dark'
        mode='horizontal'
        defaultSelectedKeys={["1"]}
        items={items}
        style={{ flex: 1, minWidth: 140 }}
        onClick={choseMenuItem}
      />
    </Header>
  );
};

export default AppHeader;

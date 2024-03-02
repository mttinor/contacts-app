import React, { useState } from 'react';

const SearchBar = () => {
  return (
    <form>
      <input
        type="text"
        placeholder="نام/شماره موبایل"
      />
      <button type="submit">سرچ</button>
    </form>
  );
};

export default SearchBar;

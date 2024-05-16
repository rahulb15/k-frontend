import * as React from "react";
import { useState } from "react";
import { Input } from "./Input";
import { Refresh } from "./Refresh";


const Search = () => {
  const [count, setCount] = useState(0);
  return (
    <>
      {/* <Refresh onClick={() => setCount(count + 1)} /> */}
      <div className="example-container">
        <Input key={count} />
      </div>
    </>
  );
};

export default Search;


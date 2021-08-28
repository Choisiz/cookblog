import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Form, Input, InputGroup } from "reactstrap";
import { SEARCH_REQUEST } from "../../redux/types";
import { FaSearch } from "react-icons/fa";
const SearchInput = () => {
  const dispatch = useDispatch();
  const [form, setForm] = useState({ search: "" });

  const onChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e) => {
    await e.preventDefault();
    const { search } = form;
    dispatch({
      type: SEARCH_REQUEST,
      payload: search,
    });
    resetValue.current.value = "";
  };

  const resetValue = useRef(null);
  return (
    <>
      <Form onSubmit={onSubmit} className="col mt-2 mb-2">
        <InputGroup>
          <Input
            style={{ borderRadius: "10px", marginRight: "10px" }}
            name="search"
            onChange={onChange}
            innerRef={resetValue}
          />
          <FaSearch color="white" className="mt-2"></FaSearch>
        </InputGroup>
      </Form>
    </>
  );
};

export default SearchInput;

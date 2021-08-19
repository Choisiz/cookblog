import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Form, Input } from "reactstrap";
import { SEARCH_REQUEST } from "../../redux/types";

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
      <Form onSubmit={onSubmit} className="col mt-2">
        <Input name="search" onChange={onChange} innerRef={resetValue} />
      </Form>
    </>
  );
};

export default SearchInput;

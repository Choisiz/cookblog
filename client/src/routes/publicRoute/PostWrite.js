import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-editor-classic/src/classiceditor";
import { editorConfiguration } from "../../components/editor/EditorConfig";
import Myinit from "../../components/editor/uploadEditor";
const PostWrite = () => {
  const { isAuthenticated } = useSelector((state) => state.login);
  const [form, setForm] = useState({
    title: "",
    contents: "",
    fileUrl: "",
  });
  const dispatch = useDispatch();

  const onChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e) => {
    await e.preventDefault();
    const { title, contents, fileUrl, category } = form;
  };

  const getdataFormCKEditor = (event, editor) => {
    const data = editor.getData(); //CKEdit5 함수: 데이터 호출
    console.log(data);
  };
  return (
    <div>
      {isAuthenticated ? (
        <Form onSubmit={onSubmit}>
          <FormGroup className="mb-3">
            <Label for="title">Title</Label>
            <Input
              type="text"
              name="title"
              id="title"
              className="form-control"
              onChange={onChange}
            />
          </FormGroup>
          <FormGroup className="mb-3">
            <Label for="category">Category</Label>
            <Input
              type="text"
              name="category"
              id="category"
              className="form-control"
              onChange={onChange}
            />
          </FormGroup>
          <FormGroup className="mb-3">
            <Label for="content">Content</Label>
            <CKEditor
              editor={ClassicEditor}
              config={editorConfiguration}
              onInit={Myinit}
              onBlur={getdataFormCKEditor}
            />
            <Button color="success" className="mt-3 col-md-2 offset-md-10 mb-3">
              완료
            </Button>
          </FormGroup>
        </Form>
      ) : null}
    </div>
  );
};

export default PostWrite;

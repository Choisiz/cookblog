import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, FormGroup, Input, Button } from "reactstrap";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-editor-classic/src/classiceditor";
import { editorConfiguration } from "../../components/editor/EditorConfig";
import Myinit from "../../components/editor/uploadEditor";
import dotenv from "dotenv";
import { POST_UPLOAD_REQUEST } from "../../redux/types";
import { Link } from "react-router-dom";
dotenv.config();

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
    const token = localStorage.getItem("token");
    const body = { title, contents, fileUrl, category, token };
    dispatch({
      type: POST_UPLOAD_REQUEST,
      payload: body,
    });
  };

  const getdataFormCKEditor = (event, editor) => {
    const data = editor.getData(); //CKEdit5 함수: 데이터 호출
    //내용중 이미지만 요청
    if (data && data.match("<img src=")) {
      const image_start = data.indexOf("<img src="); //첫번째 이미지만
      let image_end = "";
      let ext_name_find = "";
      let result_img_Url = "";
      const ext_name = ["jpeg", "jpg", "png", "gif"];

      for (let i = 0; i < ext_name.length; i++) {
        //이미지 이름에서 정의한 확장자가 존재시
        if (data.match(ext_name[i])) {
          ext_name_find = ext_name[i];
          image_end = data.indexOf(`${ext_name[i]}`);
        }
      }

      if (ext_name_find === "jpeg") {
        result_img_Url = data.substring(image_start + 10, image_end + 4);
      } else {
        result_img_Url = data.substring(image_start + 10, image_end + 3);
      }
      setForm({
        ...form,
        fileUrl: result_img_Url,
        contents: data,
      });
    } else {
      //이미지가 없다면
      setForm({
        ...form,
        fileUrl: process.env.REACT_APP_BASIC_FILE_URL,
        contents: data,
      });
    }
  };

  return (
    <div className="mt-5">
      {isAuthenticated ? (
        <Form onSubmit={onSubmit}>
          <FormGroup className="mb-3">
            <Input
              type="text"
              name="title"
              id="title"
              className="form-control"
              onChange={onChange}
              placeholder="제목을 입력하세요"
              style={{ border: "0" }}
            />
          </FormGroup>
          <FormGroup className="border-top mb-5"></FormGroup>
          <FormGroup className="mb-3">
            <Input
              type="text"
              name="category"
              id="category"
              className="form-control"
              onChange={onChange}
              placeholder="카테고리를 입력하세요"
              style={{ border: "0" }}
            />
          </FormGroup>
          <FormGroup className="border-top mb-5"></FormGroup>
          <FormGroup className="mb-3">
            <CKEditor
              editor={ClassicEditor}
              config={editorConfiguration}
              onInit={Myinit}
              onBlur={getdataFormCKEditor}
            />
            <Button
              className="mt-5 mb-4"
              style={{
                marginRight: "10px",
                backgroundColor: "#6BACCE",
                borderRadius: "20px",
                border: "0",
                width: "150px",
              }}
            >
              완료
            </Button>
            <Link
              to="/"
              className="btn btn-warning mt-5 mb-4"
              style={{
                color: "white",
                borderRadius: "20px",
                border: "0",
                width: "150px",
              }}
            >
              취소
            </Link>
          </FormGroup>
        </Form>
      ) : null}
    </div>
  );
};

export default PostWrite;

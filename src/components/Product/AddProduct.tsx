import React, { useState } from "react";
import {
  Form,
  Input,
  InputNumber,
  Button,
  Select,
  Upload,
  message,
  Modal,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { UploadChangeParam } from "antd/es/upload";

const { Option } = Select;

interface IProduct {
  _id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  totalWeight: number;
  subcategory: string;
  CookingTime: number;
  DishOrDrink: "Dish" | "Drink";
  ingredients: { name: string; weight: number }[];
}

const AddIProduct = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [previewVisible, setPreviewVisible] = useState<boolean>(false);
  const [previewImage, setPreviewImage] = useState<string>("");
  const [fileList, setFileList] = useState<any[]>([]);

  const beforeUpload = (file: any) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
      return false;
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Изображение должно быть меньше 2 МБ!");
      return false;
    }
    return true;
  };

  const handlePreview = async (file: any) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewVisible(true);
    setPreviewImage(file.url || file.preview);
  };
  const getBase64 = (file: any) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };
  const normFile = (e: UploadChangeParam) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };
  const handleChange = ({ fileList }: UploadChangeParam) => {
    setFileList(fileList);
  };
  const handleCancel = () => setPreviewVisible(false);

  const onFinish = (values: IProduct) => {
    setLoading(true);
    // Обработчик отправки данных о продукте на сервер
    setLoading(false);
    form.resetFields();
  };

  return (
    <Form onFinish={onFinish} form={form} layout="vertical">
      <Modal open={previewVisible} footer={null} onCancel={handleCancel}>
        <img alt="example" style={{ width: "100%" }} src={previewImage} />
      </Modal>
      <Form.Item label="Название" name="name" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item label="Стоимость" name="price" rules={[{ required: true }]}>
        <InputNumber min={0} step={1} />
      </Form.Item>
      <Form.Item label="Категория" name="category" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item
        label="Подкатегория"
        name="subcategory"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Общий вес"
        name="totalWeight"
        rules={[{ required: true }]}
      >
        <InputNumber min={0} step={1} />
      </Form.Item>
      <Form.Item
        label="Время приготовления"
        name="CookingTime"
        rules={[{ required: true }]}
      >
        <InputNumber min={0} step={1} />
      </Form.Item>
      <Form.Item
        label="Upload"
        valuePropName="fileList"
        getValueFromEvent={normFile}
      >
        <Upload
          accept=".jpg,.jpeg,.png,.gif"
          beforeUpload={beforeUpload}
          onPreview={handlePreview}
          action="/upload.do"
          listType="picture-card"
          onChange={handleChange}
          fileList={fileList}
        >
          {fileList.length === 0 && (
            <div>
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </div>
          )}
        </Upload>
      </Form.Item>
      <Form.Item
        label="Тип продукта"
        name="DishOrDrink"
        rules={[{ required: true }]}
      >
        <Select>
          <Option value="Dish">Блюдо</Option>
          <Option value="Drink">Напиток</Option>
        </Select>
      </Form.Item>
      <Form.List name="ingredients">
        {(fields, { add, remove }) => (
          <>
            {fields.map((field) => (
              <div key={field.key}>
                <Form.Item
                  name={[field.name, "name"]}
                  rules={[{ required: true }]}
                >
                  <Input placeholder="Название ингредиента" />
                </Form.Item>
                <Form.Item
                  name={[field.name, "weight"]}
                  rules={[{ required: true }]}
                >
                  <InputNumber min={0} step={1} placeholder="Вес г/мл" />
                </Form.Item>
                {fields.length > 1 ? (
                  <Button onClick={() => remove(field.name)} type="link">
                    Удалить ингредиент
                  </Button>
                ) : null}
              </div>
            ))}
            <Form.Item>
              <Button
                type="dashed"
                onClick={() => add()}
                block
                icon={<PlusOutlined />}
              >
                Добавить ингредиент
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Добавить продукт
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddIProduct;

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
import { IProduct } from "../../types";
import { pfoto } from "./pfoto";

const { Option } = Select;
interface TableType {
  onAdd?: () => void;
  product?: IProduct & {
    handleProductDelete?: (
      deletedProduct: IProduct,
      category: string,
      subcategory: string
    ) => void;
  };
}

const AddProduct: React.FC<TableType> = ({ product }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [previewVisible, setPreviewVisible] = useState<boolean>(false);
  const [previewImage, setPreviewImage] = useState<string>("");
  const [fileList, setFileList] = useState<any[]>([]);

  // Функция проверки файла перед загрузкой
  const beforeUpload = (file: any) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png"; // Проверяем, является ли файл изображением в форматах JPG или PNG
    if (!isJpgOrPng) {
      // Если формат файла не соответствует условиям, выводим ошибку
      message.error("You can only upload JPG/PNG file!");
      return false;
    }
    const isLt2M = file.size / 1024 / 1024 < 2; // Проверяем, не превышает ли размер файла 2 МБ
    if (!isLt2M) {
      // Если размер файла превышает 2 МБ, выводим ошибку
      message.error("Изображение должно быть меньше 2 МБ!");
      return false;
    }
    return true; // Если файл удовлетворяет условиям, разрешаем его загрузку
  };

  // Функция для предварительного просмотра файла
  const handlePreview = async (file: any) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj); // Если файл не имеет ссылки на превью и не может быть прочитан, конвертируем его в формат Base64
    }
    setPreviewVisible(true); // Скрываем окно предварительного просмотра
    setPreviewImage(file.url || file.preview); // Отображаем фотографию в окне предварительного просмотра
  };

  // Функция для получения Base64 изображения
  const getBase64 = (file: any) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader(); // Создаем объект FileReader для чтения файла
      reader.readAsDataURL(file); // Используем метод чтения файла в формате Base64
      reader.onload = () => resolve(reader.result); // При успешном чтении файла вызываем функцию resolve, передавая результат чтения файла
      reader.onerror = (error) => reject(error); // При ошибке вызываем функцию reject, передавая информацию об ошибке
    });
  };

  // Функция нормализации файла
  const normFile = (e: UploadChangeParam) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  const handleChange = (prop: any) => {
    setFileList(prop.fileList);
    console.log();
  };

  const handleCancel = () => setPreviewVisible(false);

  const onFinish = (values: IProduct) => {
    setLoading(true);
    // Обработчик отправки данных о продукте на сервер

    setLoading(false);
    form.resetFields();
    setFileList([]);
    message.success("You can only add product!");
  };

  return (
    <>
      <Form
        onFinish={onFinish}
        form={form}
        layout="vertical"
        style={{ width: "40%", margin: "0 auto" }}
      >
        <Modal open={previewVisible} footer={null} onCancel={handleCancel}>
          <img alt="example" style={{ width: "100%" }} src={previewImage} />
        </Modal>
        <Form.Item
          label="Название"
          name="name"
          initialValue={product?.name}
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Стоимость"
          name="price"
          initialValue={product?.price}
          rules={[{ required: true }]}
        >
          <InputNumber min={0} step={1} />
        </Form.Item>
        <Form.Item
          label="Категория"
          name="category"
          initialValue={product?.category}
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Подкатегория"
          name="subcategory"
          initialValue={product?.subcategory}
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Общий вес"
          name="totalWeight"
          initialValue={product?.totalWeight}
          rules={[{ required: true }]}
        >
          <InputNumber min={0} step={1} />
        </Form.Item>
        <Form.Item
          label="Время приготовления"
          name="CookingTime"
          initialValue={product?.CookingTime}
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
          initialValue={product?.DishOrDrink}
          rules={[{ required: true }]}
        >
          <Select>
            <Option value="Dish">Блюдо</Option>
            <Option value="Drink">Напиток</Option>
          </Select>
        </Form.Item>
        <Form.List name="ingredients">
          {(fields, { add, remove }) => {
            const initialValues = product ? product.ingredients : [];

            if (initialValues.length > 0 && fields.length === 0) {
              initialValues.forEach((ingredient, index) => {
                add();
              });
            }

            return (
              <>
                {fields.map((field, index) => (
                  <div key={field.key}>
                    <Form.Item
                      name={[field.name, "name"]}
                      key={field.key}
                      initialValue={initialValues[index]?.name}
                      rules={[{ required: true }]}
                    >
                      <Input placeholder="Название ингредиента" />
                    </Form.Item>

                    <Form.Item
                      name={[field.name, "weight"]}
                      key={field.key}
                      initialValue={initialValues[index]?.weight}
                      rules={[{ required: true }]}
                    >
                      <InputNumber placeholder="Вес г/мл" min={0} step={1} />
                    </Form.Item>

                    {fields.length > 1 && (
                      <Button
                        type="link"
                        onClick={() => remove(field.name)}
                        style={{ marginLeft: "10px" }}
                      >
                        Удалить ингредиент
                      </Button>
                    )}
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
            );
          }}
        </Form.List>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            {(product && "Удалить из списка") || "Добавить продукт"}
          </Button>
        </Form.Item>
      </Form>
      <div style={{ width: "50%" }} className="menu-page "></div>
    </>
  );
};

export default AddProduct;

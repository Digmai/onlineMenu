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

const { Option } = Select;
interface TableType {
  onAdd?: () => void;
  product?: IProduct;
}

const AddProductForm: React.FC<TableType> = ({ product }) => {
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
    <div className="add-product">
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        className="add-product__form"
      >
        <Modal open={previewVisible} footer={null} onCancel={handleCancel}>
          <img
            alt="example"
            src={previewImage}
            style={{ width: "100%" }}
            className="add-product__form-modal-img"
          />
        </Modal>
        <Form.Item
          name="name"
          label="Название"
          initialValue={product?.name}
          rules={[{ required: true }]}
          className="add-product__form-item-name"
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="price"
          label="Стоимость"
          rules={[{ required: true }]}
          initialValue={product?.price}
          className="add-product__form-item-price"
        >
          <InputNumber min={0} step={1} />
        </Form.Item>
        <Form.Item
          name="category"
          label="Категория"
          rules={[{ required: true }]}
          initialValue={product?.category}
          className="add-product__form-item-category"
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="subcategory"
          label="Подкатегория"
          rules={[{ required: true }]}
          initialValue={product?.subcategory}
          className="add-product__form-item-subcategory"
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Общий вес"
          name="totalWeight"
          rules={[{ required: true }]}
          initialValue={product?.totalWeight}
          className="add-product__form-item-total-weight"
        >
          <InputNumber min={0} step={1} />
        </Form.Item>
        <Form.Item
          name="CookingTime"
          label="Время приготовления"
          rules={[{ required: true }]}
          initialValue={product?.CookingTime}
          className="add-product__form-item-cooking-time"
        >
          <InputNumber min={0} step={1} />
        </Form.Item>
        <Form.Item
          label="Upload"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          className="add-product__form-item-upload"
        >
          <Upload
            action="/upload.do"
            fileList={fileList}
            listType="picture-card"
            onChange={handleChange}
            onPreview={handlePreview}
            beforeUpload={beforeUpload}
            accept=".jpg,.jpeg,.png,.gif"
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
          name="DishOrDrink"
          label="Тип продукта"
          rules={[{ required: true }]}
          initialValue={product?.DishOrDrink}
          className="add-product__form-item-dish-or-drink"
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
                  <div
                    key={field.key}
                    className="add-product__form-item-add-ingredients"
                  >
                    <Form.Item
                      key={field.key}
                      name={[field.name, "name"]}
                      rules={[{ required: true }]}
                      initialValue={initialValues[index]?.name}
                      className="add-product__form-item-add-ingredients-name"
                    >
                      <Input
                        key={index}
                        placeholder="Название ингредиента"
                        className="add-product__form-item-add-ingredients-name-placeholder"
                      />
                    </Form.Item>

                    <Form.Item
                      key={field.key}
                      rules={[{ required: true }]}
                      name={[field.name, "weight"]}
                      initialValue={initialValues[index]?.weight}
                      className="add-product__form-item-add-ingredients-weight"
                    >
                      <InputNumber
                        key={index}
                        min={0}
                        step={1}
                        placeholder="Вес г/мл"
                        className="add-product__form-item-add-ingredients-weight-placeholder"
                      />
                    </Form.Item>

                    {fields.length > 1 && (
                      <Button
                        key={index}
                        type="link"
                        style={{ marginLeft: "10px" }}
                        onClick={() => remove(field.name)}
                        className="add-product__form-item-add-ingredients-btn-delete"
                      >
                        Удалить ингредиент
                      </Button>
                    )}
                  </div>
                ))}

                <Form.Item className="add-product__form-item-add-ingredients">
                  <Button
                    block
                    type="dashed"
                    onClick={() => add()}
                    icon={<PlusOutlined />}
                    className="add-product__form-item-btn-add-ingredients"
                  >
                    Добавить ингредиент
                  </Button>
                </Form.Item>
              </>
            );
          }}
        </Form.List>
        <Form.Item className="add-product__form-item-submit">
          {(product && (
            <>
              <Button
                type="default"
                htmlType="button"
                loading={loading}
                className="add-product__form-item-submit-btn-save-updeate-in-list-product"
              >
                save-updeate
              </Button>
              <Button
                type="primary"
                htmlType="button"
                loading={loading}
                // onClick={() =>
                //   // add modal for confirmation
                //   // product.handleProductDelete && product.handleProductDelete()
                // }
                className="add-product__form-item-submit-btn-delete-in-list-product"
              >
                Удалить из списка
              </Button>
            </>
          )) || (
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              className="add-product__form-item-submit-btn-add-in-list-product"
            >
              Добавить продукт
            </Button>
          )}
        </Form.Item>
      </Form>
    </div>
  );
};
export default AddProductForm;

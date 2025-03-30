import { Button } from "@nextui-org/react";
import { BsPencilSquare, BsTrash } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import DeleteAction from "../../../components/Table/DeleteAction";

export default function ProductActions({
  product,
  deleteProduct,
  deleteProductLoading,
}) {
  const navigate = useNavigate();

  return (
    <div
      key={product.id}
      className="w-fit flex justify-center items-center gap-2"
    >
      <Button
        variant="ghost"
        size="sm"
        className="!min-w-8 !w-8 !h-8 !p-0"
        onClick={() => navigate(`/admin/manage-products/${product.id}`)}
      >
        <BsPencilSquare />
      </Button>
      <DeleteAction
        isLoading={deleteProductLoading}
        onDelete={() => deleteProduct(product.id)}
        type="Product"
      />
    </div>
  );
}

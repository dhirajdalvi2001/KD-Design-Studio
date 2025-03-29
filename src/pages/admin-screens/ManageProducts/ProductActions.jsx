import { Button, Switch } from "@nextui-org/react";
import { BsPencilSquare, BsTrash } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

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
      <Button
        variant="ghost"
        size="sm"
        isDisabled={deleteProductLoading}
        className="!min-w-8 !w-8 !h-8 text-danger !p-0"
        onClick={() => deleteProduct(product.id)}
      >
        <BsTrash />
      </Button>
    </div>
  );
}

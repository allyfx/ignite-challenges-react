import { createContext, ReactNode, useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { api } from '../services/api';
import { Product } from '../types';

interface CartProviderProps {
  children: ReactNode;
}

interface UpdateProductAmount {
  productId: number;
  amount: number;
}

interface CartContextData {
  cart: Product[];
  addProduct: (productId: number) => Promise<void>;
  removeProduct: (productId: number) => void;
  updateProductAmount: ({ productId, amount }: UpdateProductAmount) => void;
}

const CartContext = createContext<CartContextData>({} as CartContextData);

export function CartProvider({ children }: CartProviderProps): JSX.Element {
  const [cart, setCart] = useState<Product[]>(() => {
    const storagedCart = localStorage.getItem("@RocketShoes:cart");

    if (storagedCart) {
      return JSON.parse(storagedCart);
    }

    return [];
  });

  const addProduct = async (productId: number) => {
    try {
      const cartExists = cart.findIndex(c => c.id === productId);
      const response = await api.get(`/stock/${productId}`);
      const stock = response.data.amount;
      let tmpCart = [...cart];
      if (cartExists !== -1) {
        if (cart[cartExists].amount >= stock) {
          toast.error('Quantidade solicitada fora de estoque');
          return;
        }
        tmpCart[cartExists].amount += 1;
      } else {
        const newProductResponse = await api.get(`/products/${productId}`);
        tmpCart = [
          ...cart,
          {
            ...newProductResponse.data,
            amount: 1,
          },
        ];
      }
      localStorage.setItem("@RocketShoes:cart", JSON.stringify(tmpCart));
      setCart(tmpCart);
    } catch {
      toast.error('Erro na adição do produto');
    }
  };

  const removeProduct = (productId: number) => {
    try {
      const productExists = cart.find(c => c.id === productId);
      if (!productExists) {
        toast.error('Erro na remoção do produto');
        return;
      }
      const tmpCart = cart.filter(c => c.id !== productId);
      localStorage.setItem("@RocketShoes:cart", JSON.stringify(tmpCart));
      setCart(tmpCart);
    } catch {
      toast.error('Erro na remoção do produto');
    }
  };

  const updateProductAmount = async ({
    productId,
    amount,
  }: UpdateProductAmount) => {
    try {
      const productExists = cart.findIndex(c => c.id === productId);
      if (productExists === -1) {
        throw new Error();
      }
      if (amount <= 0) return;
      const stock = await (await api.get(`/stock/${productId}`)).data.amount;
      if (amount + 1 > stock) {
        toast.error('Quantidade solicitada fora de estoque');
        return;
      }
      const tmpCart = [...cart];
      tmpCart[productExists].amount = amount;
      localStorage.setItem("@RocketShoes:cart", JSON.stringify(tmpCart));
      setCart(tmpCart);
    } catch {
      toast.error('Erro na alteração de quantidade do produto');
    }
  };

  return (
    <CartContext.Provider
      value={{ cart, addProduct, removeProduct, updateProductAmount }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextData {
  const context = useContext(CartContext);

  return context;
}

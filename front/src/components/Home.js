import { useDispatch } from "react-redux";
import { addToCart } from "../features/cartSlice";
import { useGetAllProductsQuery } from "../features/productsApi";
// import {useNavigate} from 'react-router'

const Home = () => {
  const { data, isLoading, error } = useGetAllProductsQuery();
  const dispatch = useDispatch();
  // const navigate = useNavigate()
  const handleAddToCart =(product)=>{
    dispatch(addToCart(product))
    dispatch()
  }

  return (
    <div className="container">
      {isLoading ? (
        <p>loading...</p>
      ) : error ? (
        <p>An error occured...</p>
      ) : (
        <>
          <h2>Arrivals</h2>
          <div className="products">
            {data &&
              data.map((product) => (
                <div key={product.id} className="product">
                  <h3>{product.name}</h3>
                  <img src={product.image} alt={product.name} />
                  <div className="details">
                    <span>{product.desc}</span>
                    <span className="price">${product.price}</span>
                  </div>
                  <button onClick={()=> handleAddToCart(product)}>Add to cart</button>
                </div>
              ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Home;

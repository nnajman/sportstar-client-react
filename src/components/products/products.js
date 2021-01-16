import './products.css';
import { ListGroup } from "react-bootstrap";
import products from "./products.json";
import categories from "./categories.json";

function Products() {
    return (
      <div>
        <img className="background" src="https://d39l2hkdp2esp1.cloudfront.net/img/photo/124764/124764_00_2x.jpg" />
        <div className="products-container">
          <h1 className="title">Products</h1>
          <select class="form-select select" aria-label="Default select example">
          { categories.map((item, key) =>
            <option value={item.key} >
              {item.name}
            </option>
            )}
          </select>
          <ul class="list-group list">
          { products.map((item, key) =>
              <li class="list-group-item d-flex justify-content-between align-items-center" key={item.name}>
                <div>
                <p>{item.name}</p>
                <p>{item.price}</p> 
                </div>
                <div class="image-parent">
                <img src={item.imageUrl} class="img-fluid resize" alt="quixote"/>
                </div>
                
              </li>
            )}
          </ul>
        </div>
      </div>
    )
}

export default Products;
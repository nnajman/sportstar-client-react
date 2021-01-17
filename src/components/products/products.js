import './products.css';
import { ListGroup } from "react-bootstrap";
import products from "./products.json";
import categories from "./categories.json";
import { Link } from 'react-router-dom';

function Products() {
    return (
      <div>
        <img className="background" src="https://d39l2hkdp2esp1.cloudfront.net/img/photo/124764/124764_00_2x.jpg" />
        <div className="products-container">
          <div className="center">
            <h1 className="title">Products</h1>
            <select class="form-select select" aria-label="Default select example">
            { categories.map((item, key) =>
              <option value={item.key} >
                {item.name}
              </option>
              )}
            </select>
          </div>

          <ul class="list-group list">
          { products.map((item, key) =>
              <li class="list-group-item d-flex justify-content-between align-items-center" key={item.id}>
                <div>
                <p>{item.name}</p>
                <p className="bold">{item.price}</p>
                  <button class="btn btn-secondary" type="button"><Link to ={{pathname:'/EditProducts/' + item.id, props:{'id': item.id}}}>Edit</Link></button>
                  <button class="btn btn-danger btn-left" type="button"><Link to={'/DeleteProducts/' + item.id}>Delete</Link></button>
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
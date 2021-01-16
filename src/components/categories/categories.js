import './categories.css';
import { ListGroup } from "react-bootstrap";
import categories from "./categories.json"
function Categories() {
    return (
      <div>
        <img className="background" src="https://cdn.shopify.com/s/files/1/0059/0056/6597/products/photo-id-2008220827717-young-man-running-along-the-beach-in-morning_1200x800.jpg?v=1563890102" />
        <div className="products-container">
          <h1 className="title">Categories</h1>
          <ul class="list-group list">
          { categories.map((item, key) =>
              <li class="list-group-item d-flex justify-content-between align-items-center" key={item.name}>{item.name}
              
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

export default Categories;
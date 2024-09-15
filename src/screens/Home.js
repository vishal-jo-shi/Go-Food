import React,{useEffect,useState} from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";

export default function Home() {
  const [search,setSearch] = useState([]) 
  const [foodCat,setFoodCat] = useState([])
  const [foodItem,setFoodItem] = useState([])
  
  const loadData = async()=>{
    let response = await fetch('http://localhost:4000/api/foodData',{
      method:"POST",
      headers:{
        'Content-Type':'application/json'
      }
    })
    response = await response.json();
    setFoodItem(response[0]);
    setFoodCat(response[1]);
  }

  useEffect(()=>{
    loadData();
  },[])

  return (
    <div>
      <div>  <Navbar /> </div>

      <div> 
      <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{objectFit:"contain !important"}}>
        <div className="carousel-inner" id='carousel'>
          <div className="carousel-caption" style={{zIndex:"10"}}>
          <div className="d-flex justity-content-center">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e)=>{setSearch(e.target.value)}}/>
              {/* <button className="btn btn-success text-white" type="submit">Search</button> */}
        </div>
          </div>
    <div className="carousel-item active">
      <img src="/Image/FarmhousePizza.jpeg" className="d-block w-100" alt="..." style={{width:"900px",height:"700px",filter:"brightness(30%)"}}/>
    </div>
    <div className="carousel-item">
      <img src="/Image/VeggieDelightBurger.jpeg" className="d-block w-100" alt="..." style={{width:"900px",height:"700px",filter:"brightness(30%)"}}/>
    </div>
    <div className="carousel-item">
      <img src="/Image/PaneerChilli.jpeg" className="d-block w-100" alt="..." style={{width:"900px",height:"700px",filter:"brightness(30%)"}}/>
    </div>
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div>
      </div>

      <div className="container">
  {
    foodCat.length > 0 
    ? foodCat.map((data) => { 
        // Filter the food items based on category and search input
        const filteredItems = foodItem.filter(item => 
          item.categoryName === data.categoryName && 
          item.name.toLowerCase().includes(((search && typeof search === 'string') ? search.toLocaleLowerCase() : ''))
        );

        // Only render the category if filtered items are found
        if (filteredItems.length > 0) {
          return (
            <div className="row mb-3" key={data._id}>
              {/* Category Name */}
              <div className="fs-3 m-3">
                {data.categoryName}
              </div>
              <hr />

              {/* Render filtered items */}
              {filteredItems.map((filterItems) => (
                <div key={filterItems._id} className="col-12 col-md-6 col-lg-3">
                  <Card 
                    foodItem={filterItems}
                    options={filterItems.options[0]}
                  />
                </div>
              ))}
            </div>
          );
        } else {
          return null; // Do not render category if no items match
        }
      })
    : ""
  }
</div>

      
      <div> <Footer /> </div>
    </div>
  );
}

const Home = () => {
    const ItemImage = ({ img }) => {
      return <img src={img} class="card-img-top" alt="..."></img>;
    };
  
    const Title = ({ title }) => {
      return <h5 className="card-title mt-3">{title}</h5>;
    };
  
    const Description = ({ desc }) => {
      return <p className="card-text">{desc}</p>;
    };
  
    const Price = ({ price }) => {
      return <h5 className="card-title">{price}</h5>;
    };
  
    const Button = ({ btnTitle, btnColor }) => {
      return (
        <a href="#" className={btnColor}>
          {btnTitle}
        </a>
      );
    };
  
    const SearchForm = () => {
      return (
        <div className="col-8 p-4 shadow rounded-4">
          <form className="d-flex" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              onChange={(e) => console.log(e.target.value)}
            />
            <button className="btn btn-primary" type="submit">
              Search
            </button>
          </form>
        </div>
      );
    };
  
    const Item = ({ img, title, desc, price, btnTitle, btnColor }) => {
      return (
        <div className="col-md-3 mb-4">
          <div
            className="card shadow"
            style={{ width: "18rem", height: "25rem" }}
          >
            <div className="card-body">
              <ItemImage img={img} />
              <Title title={title} />
              <Description desc={desc} />
              <Price price={price} />
            </div>
            <div className="card-footer p-2 bg-dark">
              <div className="d-flex justify-content-around">
                <Button
                  className="fixed-bottom"
                  btnTitle={btnTitle}
                  btnColor={btnColor}
                />
                <Button
                  className="fixed-bottom"
                  btnTitle="Add to Cart"
                  btnColor="btn btn-danger"
                />
              </div>
            </div>
          </div>
        </div>
      );
    };
  
    const tea_items = [
      {
        id: 1,
        title: "Green Tea",
        img: "https://www.seema.com/wp-content/uploads/2022/07/Black-tea.jpg",
        desc: "Green tea is a type of tea that is made from the leaves",
        price: "Rs. 500",
        btnTitle: "Buy Now",
        btnColor: "btn btn-success",
      },
      {
        id: 2,
        title: "Green Tea",
        img: "https://www.seema.com/wp-content/uploads/2022/07/Black-tea.jpg",
        desc: "Green tea is a type of tea that is made from the leaves",
        price: "Rs. 500",
        btnTitle: "Buy Now",
        btnColor: "btn btn-success",
      },
      {
        id: 3,
        title: "Green Tea",
        img: "https://www.seema.com/wp-content/uploads/2022/07/Black-tea.jpg",
        desc: "Green tea is a type of tea that is made from the leaves",
        price: "Rs. 500",
        btnTitle: "Buy Now",
        btnColor: "btn btn-success",
      },
      {
        id: 4,
        title: "Green Tea",
        img: "https://www.seema.com/wp-content/uploads/2022/07/Black-tea.jpg",
        desc: "Green tea is a type of tea that is made from the leaves",
        price: "Rs. 500",
        btnTitle: "Buy Now",
        btnColor: "btn btn-success",
      },
      {
        id: 5,
        title: "Green Tea",
        img: "https://www.seema.com/wp-content/uploads/2022/07/Black-tea.jpg",
        desc: "Green tea is a type of tea that is made from the leaves",
        price: "Rs. 500",
        btnTitle: "Buy Now",
        btnColor: "btn btn-success",
      },
      {
        id: 6,
        title: "Green Tea",
        img: "https://www.seema.com/wp-content/uploads/2022/07/Black-tea.jpg",
        desc: "Green tea is a type of tea that is made from the leaves",
        price: "Rs. 500",
        btnTitle: "Buy Now",
        btnColor: "btn btn-success",
      },
    ];
  
    return (
      <>
        <div className="container mt-5">
          <div className="d-flex mb-5 justify-content-center">
            <SearchForm />
          </div>
          <div className="row d-flex g-4 justify-content-center  align-items-justify">
            {tea_items.map((item) => {
              return (
                <Item
                  img={item.img}
                  title={item.title}
                  desc={item.desc}
                  price={item.price}
                  btnTitle={item.btnTitle}
                  btnColor={item.btnColor}
                  key={item.id}
                />
              );
            })}
          </div>
        </div>
      </>
    );
  };
  
  export default Home;
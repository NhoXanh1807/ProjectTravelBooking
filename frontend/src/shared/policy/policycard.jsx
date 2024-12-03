import React from "react";
import { Link } from 'react-router-dom';
const Policycard = ({ item }) => {
    const { id, imgUrl, tag, title, desc } = item
    return (
        <div className="blog-item">
            <div className="blog-item__image">
                <img src={imgUrl} alt="" />
            </div>
            <div className="blog-item__content">
                <div className="blog-item__tag">{tag}</div>
                <h3 className="blog-item__title"><Link to={`/policy/${id}`}>{title}</Link></h3>
                <p className="blog-item__desc">{desc}</p>
            </div>
        </div>
    );

}
export default Policycard;
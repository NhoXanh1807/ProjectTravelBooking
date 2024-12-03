import './policy.css';
import React from 'react';
import Policycard from './policycard';
import image from '../../assets/image/Rectangle 15.png'
const data = [
    {
        id:1,
        imgUrl: image,
        tag: "NOTICE!",
        title: "Privacy Policy",
        desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit Porro, maiores? Repellat ducimus tenetur, fuga eligendi rem nam cum inventore quisquam hic dignissimos officiis temporibus perspiciatis laboriosam atque modi, quidem magni!",
    },
    {
        id:2,
        imgUrl: image,
        tag: "NOTICE!",
        title: "Terms of Service",
        desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit Porro, maiores? Repellat ducimus tenetur, fuga eligendi rem nam cum inventore quisquam hic dignissimos officiis temporibus perspiciatis laboriosam atque modi, quidem magni!",
    },
    {
        id:3,
        imgUrl: image,
        tag: "NOTICE!",
        title: "Terms of Conditions for Registering Your Tourism Business",
        desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit Porro, maiores? Repellat ducimus tenetur, fuga eligendi rem nam cum inventore quisquam hic dignissimos officiis temporibus perspiciatis laboriosam atque modi, quidem magni!",
    }
]
function Policy() {
    return (
        <section className="section-4">
            <div className="container">
                <div className="box-head">
                    <div className="box-head__title">About Us</div>
                </div>
                <div className="section-4__warp">
                    {data.map((item, index) => (
                        <Policycard key={index} item={item} />
                    ))}
                </div>
            </div>
        </section>

    );
};
export default Policy;
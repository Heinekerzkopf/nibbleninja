import './benefits.css'
import img01 from './img/img_01.png'
import img02 from './img/img_02.png'
import img03 from './img/img_03.png'
import img04 from './img/img_04.png'


const Benefits = () => {
    return (
        <div className='benefits'>
            <div className="benefits__container">
                <div className="benefits__title-block">
                    <h2 className="benefits__title">Have a  <span className='benefits__title-big'>NibbleNinja</span>  for</h2>
                </div>
                <div className="benefits__items">
                    <div className="benefits__item">
                        <div className="benefits__item-img">
                            <img src={img01} alt="first image" />
                        </div>
                        <div className="benefits__item-info">
                            <div className="item-info__title">Find a diet you love</div>
                            <div className="item-info__text">
                                Find a nutritious Diet that fits your lifestyle and food preferences. Take charge of your daily habits with one of the many ongoing Diets including Clean Eating and High Protein
                            </div>
                        </div>
                    </div>
                    <div className="benefits__item">
                        <div className="benefits__item-img">
                            <img src={img02} alt="second image" />
                        </div>
                        <div className="benefits__item-info">
                            <div className="item-info__title">Start a simplified meal plan</div>
                            <div className="item-info__text">
                            Follow a 7-21 day Meal Plan and get four pre-planned recipes a day. Depending on your health goals, there are many Meal Plans to choose from including Keto Burn and Vegan for a week.
                            </div>
                        </div>
                    </div>
                    <div className="benefits__item">
                        <div className="benefits__item-img">
                            <img src={img03} alt="third image" />
                        </div>
                        <div className="benefits__item-info">
                            <div className="item-info__title">Track your way to success</div>
                            <div className="item-info__text">
                            Track your activities and what you eat with the help of our food-, exercise- and water trackers to maintain a balanced everyday life.
                            </div>
                        </div>
                    </div>
                    <div className="benefits__item">
                        <div className="benefits__item-img">
                            <img src={img04} alt="fourth image" />
                        </div>
                        <div className="benefits__item-info">
                            <div className="item-info__title">Start your own healthy journey</div>
                            <div className="item-info__text">
                            To help you reach your goals and customize your health journey you can add your favorite meals, food items, recipes and exercises to your Favorites.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Benefits
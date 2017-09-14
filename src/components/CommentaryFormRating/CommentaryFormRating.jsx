import React from 'react';

import url from './CommentaryFormRating.scss';

export default class CommentaryFormRating extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            ratings: [
                { active: false },
                { active: false },
                { active: false },
                { active: false },
                { active: false }
            ]
        }
    }

    render() {
        const newRatings = Object.assign(this.state.ratings);

        if (this.props.ratingCount === 0) {
            newRatings.forEach(rating => rating.active = false);
        } else {
            newRatings.forEach(rating => rating.active = false);

            for (let i = 0; i < this.props.ratingCount; i++) {
                newRatings[i].active = true;
            }
        }

        const fiveStarClassName = newRatings.filter(rating => rating.active).length === 5 ? 'proto-stars proto-stars--fifth' : 'proto-stars';

        return (
            <ul className={fiveStarClassName}>
                {
                    newRatings.map((rating, idx) => {
                        const starClassName = rating.active ? 'fa fa-star proto-stars__star ' : 'fa fa-star-o proto-stars__star ';

                        return (
                            <li key={idx} className={starClassName}></li>
                        )
                    })
                }
            </ul>
        );
    }
}
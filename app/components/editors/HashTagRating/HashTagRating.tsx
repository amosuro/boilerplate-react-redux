import * as React from "react";

import './HashTagRating.less';

interface HashTagRatingProps {
    hashTags: string[]
}

interface HashTagRatingInternalState {
    ratings: { active: boolean }[]
}

export default class HashTagRating extends React.Component<HashTagRatingProps, HashTagRatingInternalState> {
    constructor(props: HashTagRatingProps) {
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
        const newRatings = [...this.state.ratings];

        if (!this.props.hashTags.length) {
            newRatings.forEach(rating => rating.active = false);
        } else {
            newRatings.forEach(rating => rating.active = false);

            for (let i = 0; i < this.props.hashTags.length; i++) {
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

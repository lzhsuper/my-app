import React from 'react';
export default function IsLoading({className}) {
    return (
        <div className={className}>
            <h1>Loading</h1>
            <svg x="0px" y="0px" viewBox="0 0 100 100" enableBackground="new 0 0 0 0" xmlSpace="preserve">
                <circle fill="rgba(90, 67, 36, 0.60)" stroke="none" cx="6" cy="50" r="6" transform="translate(0 0)">
                    <animateTransform attributeName="transform" dur="1s" type="translate" values="0 1 ; 0 -1; 0 1"
                                      repeatCount="indefinite" begin="0.01"/>
                </circle>
                <circle fill="rgba(90, 67, 36, 0.42)" stroke="none" cx="30" cy="50" r="6" transform="translate(0 0)">
                    <animateTransform attributeName="transform" dur="1s" type="translate" values="0 6 ; 0 -6; 0 6"
                                      repeatCount="indefinite" begin="0.2"/>
                </circle>
                <circle fill="rgba(90, 67, 36, 0.25)" stroke="none" cx="54" cy="50" r="6" transform="translate(0 0)">
                    <animateTransform attributeName="transform" dur="1s" type="translate" values="0 10 ; 0 -10; 0 10"
                                      repeatCount="indefinite" begin="0.3"/>
                </circle>
            </svg>
        </div>
    )
}
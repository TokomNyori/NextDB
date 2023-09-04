interface CardSkeletonProps {
    id: any,
}

const CardSkeleton: React.FC<CardSkeletonProps> = ({ id }) => {
    return (
        <div className="card pt-3 rounded-lg skeleton mb-2" key={id}>
            <div className="card-skeleton rounded-lg">

            </div>
        </div>
    )
}

export default CardSkeleton
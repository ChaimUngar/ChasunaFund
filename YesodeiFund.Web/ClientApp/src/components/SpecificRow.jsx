const SpecificRow = ({ donation }) => {

    const { firstName, lastName, amount, date, methodOfDonation, chasuna } = donation

    const formatDate = (date) => {
        var options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }

        return new Date(date).toLocaleDateString([], options)
    }

    return (
        <tr>
            <td>{lastName}, {firstName}</td>
            <td>{`$${amount.toFixed(2)}`}</td>
            <td>{chasuna.neighbor}'s Chasuna</td>
            <td>{methodOfDonation}</td>
            <td>{formatDate(date)}</td>
        </tr>
    )
}

export default SpecificRow
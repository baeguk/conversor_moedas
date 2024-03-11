import { useState, useEffect } from 'react'
import axios from 'axios'

const CurrencyConverter = () => {
    const [rates, setRates] = useState(0)
    const [fromCurrency, setFromCurrency] = useState("USD")
    const [toCurrency, setToCurrency] = useState("EUR")
    const [amount, setAmount] = useState(1)
    const [convertedAmount, setConvertedAmount] = useState(1)

    useEffect(() => {
        axios.get(
            "https://v6.exchangerate-api.com/v6/dc11d1c398280ea4a6d68de7/latest/USD"
        )
            .then((response) => {
                setRates(response.data.conversion_rates)
            }).catch((error) => {
                console.log("Ocorreu um erro:", error)
            });
    }, []);

    useEffect(() => {
        if(rates) {
            const rateFrom = rates[fromCurrency] || 0;
            const rateTo = rates[toCurrency] || 0;
            setConvertedAmount(((amount / rateFrom) * rateTo).toFixed(2));
        }
    }, [amount, rates, fromCurrency, toCurrency])

    if(!rates) {
        return <div>Carregando...</div>
    }

    return (
        <div className='converter'>
            <h2>Conversor de Moedas</h2>
            <input
                type="number"
                value={amount}
                placeholder='Digite o valor'
                onChange={(e) => setAmount(e.target.value)}
            />
            <span>Selecione as moedas:</span>
            <select 
                value={fromCurrency}
                onChange={(e) => setFromCurrency(e.target.value)}
            >
                {Object.keys(rates).map((currency) => (
                    <option key={currency} value={currency}>
                        {currency}
                    </option>
                ))}
            </select>
            <span>Para:</span>
            <select 
                value={toCurrency} 
                onChange={(e) => setToCurrency(e.target.value) }
            >
                {Object.keys(rates).map((currency) => (
                    <option value={currency} key={currency}>{currency}</option>
                ))}
            </select>
            <h3>{convertedAmount} {toCurrency}</h3>
            <p>{amount} {fromCurrency} valem {convertedAmount} {toCurrency}</p>
        </div>
    )
}

export default CurrencyConverter
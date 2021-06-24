function formatMoney(value: number) {
    return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
    }).format(value)
}

function formatDate(dateString: string) {
    return new Intl.DateTimeFormat("pt-BR").format(new Date(dateString));
}

export { formatMoney, formatDate }
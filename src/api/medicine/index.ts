import request from '@/utils/request'
export function selectAllMedicine() {
    return request({
        url: 'selectAll',
        method: 'POST',
    })
}
export function selectAllOrderByBuy() {
    return request({
        url: 'orderByBuy',
        method: 'POST',
    })
}
export function selectAllOrderBySale() {
    return request({
        url: 'orderBySale',
        method: 'POST',
    })
}
export function selectAllOrderByProfit() {
    return request({
        url: 'orderByProfit',
        method: 'POST',
    })
}

export function deleteMedicine(params: { id: number }) {
    return request({
        url: 'deleteMedicine',
        method: 'POST',
        data: params
    })
}

export function search(params: { string: string }) {
    return request({
        url: 'search',
        method: 'POST',
        data: params
    })
}
import axios from 'axios'
import ip from '../config'
import ipshop from '../configshop'
import deviceStorage from '../deviceStorage'

export function ALL_VIDEOS(offset, limit) {
    return {
        type: "ALL_VIDEOS",
        payload: axios.get(`${ip}/videos/${offset}/${limit}`)
    }
}
export function GET_PRODUCTS() {
    return {
        type: "GET_PRODUCTS",
        payload: axios.get(`${ipshop}/products`)
    }
}
export function GET_CART() {
    return {
        type: "GET_CART",
        payload: axios.get(`${ipshop}/orders`)
    }
}

export function DETAIL_VIDEO(slug) {
    return {
        type: "DETAIL_VIDEO",
        payload: axios.get(`${ip}/video/${slug}`)
    }
}

export function POPULAR(limit) {
    return {
        type: "POPULAR",
        payload: axios.get(`${ip}/video/series/popular/${limit}`)
    }
}

export function USER(data) {
    return {
        type: "USER",
        payload: data
    }
}

export function CATEGORY(category, limit) {
    return {
        type: "CATEGORY",
        payload: axios.get(`${ip}/video/${category}/${limit}`)
    }
}

export function EPISODE(series) {
    return {
        type: "EPISODE",
        payload: axios.get(`${ip}/video/series/${series}/null`)
    }
}

export function SEARCH(text) {
    return {
        type: "CATEGORY",
        payload: axios.get(`${ip}/series/search?q=${text}&o=0`)
    }
}

export function GET_FAVORIT(token) {
    return {
        type: "FAVORITE",
        payload: axios.get(`${ip}/user/favorites`, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        }
        )
    }
}
import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001" || "http://travelwhiz.surge.sh"

//API Class
//Static class tying together methods used to get/send to the API 

class TravelWhizApi {
    //token for interactive with the API will be stored here
    static token;

    static async request(endpoint, data = {}, method = "get") {

        //passing authorization token in the header
        const url = `${BASE_URL}/${endpoint}`
        const headers = { Authorization: `Bearer ${TravelWhizApi.token}` }
        const params = (method === 'get') ? data : {}


        try {
            return (await axios({ url, method, data, params, headers })).data
        } catch (err) {
            let message = err.response.data.error.message
            throw Array.isArray(message) ? message : [message]
        }
    }

    // Individual API routes


    //User related routes

    //Get current user
    static async getCurrentUser(username) {
        let res = await this.request(`users/${username}`)
        return res.user
    }

    //Sign up for site
    static async signup(data) {
        let res = await this.request(`auth/register`, data, "post")
        return res.token
    }

    //Get token for login from username and password
    static async login(data) {
        let res = await this.request(`auth/token`, data, "post")
        return res.token
    }

    //Update User profile page
    static async saveProfile(username, data) {
        let res = await this.request(`users/${username}`, data, "patch")
        return res.user
    }
    
    //Edit Pin
    static async patchPin(id, data) {
        let res = await this.request(`pins/${id}`, data, "patch");
        return res.pin;
    }

    //Delete Pin
    static async deletePin(id) {
        let res = await this.request(`pins/${id}`, {}, "delete")
        return res
    }

    //Favorite Pins
    static async fav(username, id) {
        let res = await this.request(`users/${username}/favorite/${id}`, {}, "post")
        return res
    }

    //Unfavorite Pins
    static async unfav(username, id) {
        let res = await this.request(`users/${username}/favorite/${id}`, { id }, "delete")
        return res
    }

    //Get a list of user favorites
    static async userFavs(username) {
        let res = await this.request(`users/${username}/favorite`, {}, "get")
        return res
    }

}

export default TravelWhizApi
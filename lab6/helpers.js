const { ObjectId } = require("mongodb");

//You can add and export any helper functions you want here. If you aren't using any, then you can just leave this file as is.
const validateMovie=async(
    title,
    plot,
    genres,
    rating,
    studio,
    director,
    castMembers,
    dateReleased,
    runtime
)=>{
    if (!title || !plot || !genres || !rating || !studio || !director || !castMembers || !dateReleased || !runtime) {
        throw "Error : empty input detected!";
    }
    if (typeof title !== 'string' || typeof plot !== 'string' || typeof rating !== 'string' || typeof studio !== 'string' || typeof director !== 'string' || typeof dateReleased !== 'string' || typeof runtime !== 'string') {
        throw "Error : input is not a string";
    }
    if (title.trim().length == 0 || plot.trim().length == 0 || rating.trim().length == 0 || studio.trim().length == 0 || director.trim().length == 0 || dateReleased.trim().length == 0 || runtime.trim().length == 0) {
        throw "Error : Empty String detected!!";
    }
    title = title.trim();
    plot = plot.trim();
    rating = rating.trim();
    studio = studio.trim();
    director = director.trim();
    dateReleased = dateReleased.trim();
    runtime = runtime.trim();
    if (!((/^[a-zA-Z0-9\s]{2,}$/g).test(title))) {
        throw "Error : title should be atleat two characters and can only contain letters and numbers";
    }
    if (!((/^[a-zA-Z\s]{5,}$/g).test(studio))) {
        throw "Error : studio should be atleat five characters and can only contain letters";
    }
    if (!((/^([a-zA-Z]{3,}\s[a-zA-Z]{3,})$/g).test(director))) {
        throw "Error : first name and last name must be at least 3 characters each and only letters a-z or A-Z";
    }
    if (!((/^(G|PG|PG-13|R|NC-17)$/).test(rating))) {
        throw "Error : Invalid rating";
    }
    if (!Array.isArray(genres) || genres.length < 1) {
        throw "Error : genres must be an array with atleat one genre";
    }
    genres.forEach(e => {
        if (typeof e !== 'string' || !((/^[a-zA-Z\s]{5,}$/g).test(e.trim()))) {
            throw "Error : invalid genre detected!";
        }
    });
    if (!Array.isArray(castMembers) || castMembers.length < 1) {
        throw "Error : castMembers must be an array with atleat one cast";
    }
    castMembers.forEach(e => {
        if (typeof e !== 'string' || !((/^([a-zA-Z]{3,}\s[a-zA-Z]{3,})$/g).test(e.trim()))) {
            throw "Error : invalid cast detected!";
        }
    });

    if (!((/^[0-9]{2,2}\/[0-9]{2,2}\/[0-9]{4,4}/).test(dateReleased))) {
        throw "Error : Invalid date format";
    }
    let date = new Date(dateReleased);
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let year = date.getFullYear()
    if (!((/^[0-9]{2,2}$/).test(month))) {
        month = "0" + month;
    }
    if (!((/^[0-9]{2,2}$/).test(day))) {
        day = "0" + day;
    }
    let input = month + '/' + day + "/" + year;
    let past = new Date("01/01/1900");
    let current = new Date();
    let future = new Date(current.getFullYear() + 2, current.getMonth(), current.getDate())
    if (dateReleased !== input) {
        throw "Error : Invalid date";
    }
    if (date < past || date > future) {
        throw "Error : this movie is very old or not yet available";
    }
    if (!((/^[0-9]h\s[0-9]{1,2}min$/).test(runtime))) {
        throw "Error : Invalid runtime format";
    }

    let run = runtime.replace(/h|min/g, "").split(" ");
    let hour = parseInt(run[0]);
    let min = parseInt(run[1]);
    if (hour < 0 || hour > 24 || min < 0 || min > 59) {
        throw "Error : Invalid runtime";
    }
    if ((hour == 0 && min < 59) || (hour == 1 && min == 0)) {
        throw "Error : short runtime";
    }
    return true;
}

const validateId = async(movieId)=>{
    if (!movieId) {
        throw 'Error : You must provide an id to search for';
    }
    if (typeof movieId !== 'string') {
        throw 'Error : Id must be a string';
    }
    movieId=movieId.trim();
    if (movieId.length === 0) {
        throw 'Error : Id cannot be an empty string or just spaces';
    }
    if (!ObjectId.isValid(movieId.trim())) {
        throw 'Error : invalid object ID';
    }
    return movieId;
}

const validateReview = async(reviewTitle,reviewerName,review,rating)=>{
    if (!reviewTitle || !reviewerName || !review || !rating) {
        throw "Error : empty input detected!";
    }
    if (typeof reviewTitle !== 'string' || typeof reviewerName !== 'string' || typeof review !== 'string') {
        throw "Error : input is not a string";
    }
    if (reviewTitle.trim().length == 0 || reviewerName.trim().length == 0 || review.trim().length == 0) {
        throw "Error : Empty String detected!!";
    }
    if(!((/^[a-zA-Z !?,\.]{1,}$/).test(reviewTitle))){
        throw "Error : reviewer title is invalid"
    }
    if(!((/^[a-zA-Z ]{1,}$/).test(reviewerName))){
        throw "Error : reviewer name is invalid"
    }
    if(typeof rating!=='number' || rating<1 || rating>5){
        throw "Error : Invalid rating";
    }
    if(rating.toString().includes('.')){
        if(!((/^[1-4]\.[0-9]$/).test(rating.toString()))){
            throw "Error : rating can have at max one decimal place"
        }
    }
    return true;
}

module.exports = {
    validateMovie,
    validateId,
    validateReview
  };
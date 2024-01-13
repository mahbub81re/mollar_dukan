import mongoose from 'mongoose';



const CategorySchema = new mongoose.Schema({
    categoryName : String,
    categoryDescription :String ,
    categoryImage : String ,
    subcategories : [
        {
            categories: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Category",
            }
        }
    ],
    categorySlug : String

},{timestamps : true});

const Category = mongoose.models.Category || mongoose.model('Category', CategorySchema);

export default Category;
import pandas as pd

# Get genres file
genres_df = pd.read_csv("genre_list.csv", header=None, names=["genre"])
genres = genres_df["genre"].tolist()
genres = [genre.lower() for genre in genres]

# Fetch the unprocessed csv file
df = pd.read_csv('unprocessedData.csv')

# Fill null data with empty string
df = df.fillna("")

# Clean data based on ISBN13/10 
# Ensure proper data type; Remove duplicate ISBNs
df["isbn13"] = df["isbn13"].astype(str).str.replace("-", "")
df["isbn10"] = df["isbn10"].astype(str).str.replace("-", "")
df = df.drop_duplicates(subset=["isbn13", "isbn10"])

def remove_punctuation(text):
    if not isinstance(text, str):
        return ""
    for ch in ['.', ',', ';', ':', '/', '\\', '(', ')', '[', ']', '{', '}', '"', "'"]:
        text = text.replace(ch, " ")
    return " ".join(text.split()).lower()

def extract_genres(category):
    if not isinstance(category, str) or not category.strip():
        return []
    
    cell = remove_punctuation(category)
    found = []

    for genre in genres:
        if genre in cell:
            found.append(genre)

    return list(set(found))

df["genre_list"] = df["categories"].apply(extract_genres)

print(df["genre_list"].head(10))
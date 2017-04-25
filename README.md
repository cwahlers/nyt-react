# nyt-react
# NYT Domain Model

 
## Object: favoriteArticles
### Attributes:
+ favoriteArticle? – each individual favorite article which was stored in the database

### Functions and Methods:
+ getFavoriteArticles – retrieves favorite articles stored in the database

### State:

### Relationships
+ favoriteArticle is a child

## Object: favoriteArticle

### Attributes:
+ title – article title
+ date – publish date of the article
+ url – url to article
+ vote – integer representing the vote count

### Functions and Methods:
+ removeFavorite – removes the favorite article from the database and updates the current list
+ voteFavorite – increases or decreases the vote count for the favorite article

### State:         

### Relationships
+ favoriteArticles is the parent


## Object: nytSearch

### Attributes:
+ title – text field used to find articles using NYT API based on title

### Functions and Methods:
+ searchArticles – calls NYT api, clears and updates the nytResults

### State:
+ active – upon submitting search the active state is set true, if not active (false), then no results are displayed in nytResults

### Relationships
+ nytResults – contains results returned from the search


## Object: nytResults

### Attributes:
+ nytResult? – each individual row (object) returned from the search

### Functions and Methods:       

### State:
      
### Relationships
+ nytResult is a child

## Object: nytResult

### Attributes:
+ resultTitle – title from API response
+ resultDate – date from API response
+ resultUrl – url from API response

### Functions and Methods:
+ removeResult – removes the article from the current search results list (nytResults)      

### State:         

### Relationships
+ nytResults is the parent



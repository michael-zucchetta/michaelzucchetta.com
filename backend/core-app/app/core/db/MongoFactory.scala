package core.db; 

import com.mongodb.casbah.MongoCollection
import com.mongodb.casbah.MongoClient

object MongoFactory {
    private val SERVER = "localhost"
    private val PORT   = 27017
    private val DATABASE = "michaelzucchetta"
   
    private val mongoDriver = new reactivemongo.api.MongoDriver
    private val mongoConnection = mongoDriver.connection(List("localhost:27017"))
    
    val connection = MongoClient(SERVER, PORT)
    // val collection = connection(DATABASE)(COLLECTION)
    
    def getConnection(): MongoClient = {
      return connection;
    }
    
    def getCollection(collectionName: String): MongoCollection = {
      return this.connection(DATABASE)(collectionName);
    }

    def getString(): String = {
      return "Hola!";
    }
}

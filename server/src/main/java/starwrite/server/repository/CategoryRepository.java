package starwrite.server.repository;

import java.util.List;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.data.neo4j.repository.query.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.security.core.parameters.P;
import starwrite.server.entity.Category;
import starwrite.server.entity.Post;
import starwrite.server.relationship.Related;
import starwrite.server.response.GetCategoryPosts;
import starwrite.server.response.PostResponse;
import starwrite.server.response.RelatedPosts;

//@Repository
public interface CategoryRepository extends Neo4jRepository<Category, String> {

  @Query("MATCH (n:posts{category: $categoryId})<-[r:POSTED]-(post:category) RETURN post")
  List<Post> findPostsByCategory(String categoryId);

  @Query("MATCH (c:Category) WHERE c.categoryId = $id RETURN c LIMIT 1")
  Category findCategoryById(@Param(value = "id") String id);

//  @Query("MATCH (u:Users) WHERE u.userId = $userId " +
//      "MATCH (c:Category) WHERE c.categoryId = $categoryId " +
//      "CREATE (u)-[r:OWNS]->(c) " +
//      "RETURN c")
//  RelatedPosts getCategoryPostsNode(@Param(value = "userId") String userId, @Param(value = "categoryId") String categoryId);


  // 카테고리 안의 모든 글 제목과 관계 보내기
  @Query("MATCH (c:Category) WHERE c.categoryId = $categoryId " +
      "MATCH (c)-[]-(p:Post) " +
      "MATCH (p)-[r]->(p2:Post) RETURN r.postId AS postId, r.postTitle AS postTitle, r.relatedPostId AS relatedPostId, r.relatedPostTitle AS relatedPostTitle ")
  List<GetCategoryPosts> getCategoryPostsNode(@Param(value = "categoryId") String categoryId);


  @Query("MATCH (c:Category)" +
      "RETURN c")
  List<Category> getAllCategory();

  @Query(
      "CREATE (c:Category{ name: $name, createdAt: localdatetime(), updatedAt: localdateTime()}) " +
          "RETURN c")
  Category createCategory(@Param(value = "name") String name);

//  @Query("MATCH p=(u:Users)-[r:OWNS]->() WHERE u.userId = $userId RETURN p LIMIT 1")
//  List<Object> findCategoryByUserId(@Param(value = "userId") String userId);

//  @Query("MATCH p=(u:Users)-[r]-(c:Category) RETURN collect(p)")
//  List<Object> findCategoryByUserId(@Param(value = "userId") String userId);

//  @Query("MATCH (u:Users)-[r]-(c:Category) WHERE u.userId = $userId RETURN u.userId AS userId, type(r) AS relationType, c.categoryId AS categoryId")
//  List<PostResponse> findCategoryByUserId(@Param("userId") String userId);

  // 이것이 작동되는걸 확인한 코드
//@Query("MATCH (u:Users)-[r]-(c:Category) WHERE u.userId = $userId RETURN u AS userId, type(r) AS relationType, c AS category LIMIT 1")
//PostResponse findCategoryByUserId(@Param(value = "userId") String userId);


  @Query("MATCH (u:Users)-[r]-(c:Category)-[]-(p:Post) WHERE u.userId = $userId " +
      "RETURN u AS userId, type(r) AS relationType, collect(c) AS category, collect(p) AS post")
  PostResponse findCategoryByUserId(@Param(value = "userId") String userId);


  @Query("MATCH (u:Users)-[]-(c:Category) " +
      "MATCH (c)-[r]-(p:Post) " +
      "RETURN r ")
  List<GetCategoryPosts> getCategoryPosts(@Param(value = "categoryId") String categoryId,
      @Param(value = "userId") String userId);

}

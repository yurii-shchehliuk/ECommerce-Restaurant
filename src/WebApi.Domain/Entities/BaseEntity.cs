namespace WebApi.Domain.Entities
{
    /// <summary>
    /// For storedb entities
    /// </summary>
    public abstract class BaseEntity
    {
        public virtual int Id { get; set; }
    }
}
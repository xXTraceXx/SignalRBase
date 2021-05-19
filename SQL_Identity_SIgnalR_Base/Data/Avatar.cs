using System.ComponentModel.DataAnnotations.Schema;

namespace SQL_Identity_SIgnalR_Base.Data
{
    [Table("Avatar")]
    public class Avatar
    {
        [Column("Id")]
        public int Id { get; set; }

        [Column("ImageBase64")]
        public string ImageBase64 { get; set; }
    }
}
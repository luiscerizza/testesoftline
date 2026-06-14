using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace testesoftline.Models
{
    [Table("usuario")]
    public class Usuario
    {
        [Key]
        [Column("id")]
        public int Id { get; set; }

        [Required]
        [MaxLength(32)]
        [Column("nome")]
        public string Nome { get; set; } = string.Empty;

        [Required]
        [MaxLength(255)]
        [Column("senha")]
        public string Senha { get; set; } = string.Empty;

    }
}

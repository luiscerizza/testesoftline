using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace testesoftline.Models
{
    [Table("clientes")]
    public class Cliente
    {
        [Key]
        [Column("codigo")]
        public int Codigo { get; set; }

        [Required]
        [MaxLength(60)]
        [Column("nome")]
        public string Nome { get; set; } = string.Empty;

        [MaxLength(100)]
        [Column]
        public string? Fantasia { get; set; }

        [Required]
        [MaxLength(14)]
        [Column("documento")]
        public string Documento { get; set; } = string.Empty;

        [Required]
        [MaxLength(50)]
        [Column("rua")]
        public string Rua { get; set; } = string.Empty;

        [Required]
        [MaxLength(7)]
        [Column("numero")]
        public string Numero { get; set; } = string.Empty;
        
        [Required]
        [MaxLength(50)]
        [Column("bairro")]
        public string Bairro { get; set; } = string.Empty;

        [Required]
        [MaxLength(50)]
        [Column("cidade")]
        public string Cidade { get; set; } = string.Empty;
    }
}

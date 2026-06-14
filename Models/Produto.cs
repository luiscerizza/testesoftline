using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace testesoftline.Models
{
    [Table("produtos")]
    public class Produto
    {
        [Key]
        [Column("codigo")]
        public int Codigo { get; set; }

        [Required]
        [MaxLength(60)]
        [Column("descricao")]
        public string Descricao { get; set; } = string.Empty;

        [MaxLength(14)]
        [Column("codigo_barras")]
        public string? CodigoBarras { get; set; }

        [Column("valor_venda")]
        public decimal? ValorVenda { get; set; }

        [Column("peso_bruto")]
        public decimal? PesoBruto { get; set; }

        [Column("peso_liquido")]
        public decimal? PesoLiquido { get; set; }

    }
}

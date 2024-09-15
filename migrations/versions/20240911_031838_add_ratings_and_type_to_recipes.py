"""Add ratings and type to recipes

Revision ID: 70477bb9c4ae
Revises: a1b0d4e4033c
Create Date: 2024-09-11 03:18:38.351485

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '70477bb9c4ae'
down_revision = 'a1b0d4e4033c'
branch_labels = None
depends_on = None


def upgrade():
    # Create the Enum type separately
    enum_type = sa.Enum('SNACK', 'ENTREE', 'DESSERT', 'LUNCH', name='recipetype')
    enum_type.create(op.get_bind())  # This creates the enum type in the database

    with op.batch_alter_table('recipes', schema=None) as batch_op:
        batch_op.add_column(sa.Column('ratings', sa.Float(), nullable=True))
        batch_op.add_column(sa.Column('type', enum_type, nullable=False))

def downgrade():
    with op.batch_alter_table('recipes', schema=None) as batch_op:
        batch_op.drop_column('type')
        batch_op.drop_column('ratings')

    # Drop the Enum type separately
    enum_type = sa.Enum('SNACK', 'ENTREE', 'DESSERT', 'LUNCH', name='recipetype')
    enum_type.drop(op.get_bind())  # This drops the enum type from the database
